from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from db import get_connection
from auth import hash_password, verify_password, create_access_token, get_current_user, get_current_admin
from fastapi.security import OAuth2PasswordRequestForm
from models import ProductCreate




app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/register")
def register(username: str, password: str, firstname: str, lastname: str, phone: int):
    conn = get_connection()
    cursor = conn.cursor()
    hashed = hash_password(password)
    try:
        cursor.execute(
            "INSERT INTO users (username, password, firstname, lastname, phone) VALUES (%s, %s,%s,%s,%s)",
            (username, hashed, firstname, lastname, phone)
        )
        conn.commit()
        return {"message": "User registered successfully"}
    except:
    
        raise HTTPException(status_code=400, detail="Username already exists")
    finally:
        cursor.close()
        conn.close()

@app.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    username = form_data.username
    password = form_data.password

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute(
        "SELECT * FROM users WHERE username = %s",
        (username,)
    )
    user = cursor.fetchone()

    cursor.close()
    conn.close()

    if not user or not verify_password(password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({
        "sub": user["username"],
        "role": user["role"]
        })
    return {"access_token": token, "token_type": "bearer"}


@app.get("/")
def root():
    return {"message": "E-commerce API is running"}

@app.get("/products")
def get_products():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM products")
    products = cursor.fetchall()

    cursor.close()
    conn.close()

    return products


@app.get("/products/{product_id}")
def get_product(product_id: int):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute(
        "SELECT * FROM products WHERE id = %s",
        (product_id,)
    )
    product = cursor.fetchone()

    cursor.close()
    conn.close()

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    return product

# Admin - Add Products

@app.post("/admin/products")
def add_product(
    product: ProductCreate,
    user: dict = Depends(get_current_admin)

):
    # 1. Basic validation
    if product.price <= 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Price must be greater than zero"
        )

    conn = get_connection()
    cursor = conn.cursor()

    try:
        # 2. Insert product  
        cursor.execute(
            """
            INSERT INTO products (name, price, description)
            VALUES (%s, %s, %s)
            """,
            (product.name, product.price, product.description)
        )

        conn.commit()

        return {
            "message": "Product added successfully",
            "added_by": user["username"]
        }

    except Exception as e:
        conn.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to add product"
        )

    finally:
        cursor.close()
        conn.close()

    


# Add to cart
@app.post("/cart/add")
def add_to_cart(
    product_id: int,
    quantity: int,
    user: dict = Depends(get_current_user)
):
    username = user["username"]
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    # Get user id
    cursor.execute(
        "SELECT id FROM users WHERE username = %s",
        (username,)
    )
    user_row = cursor.fetchone()

    if not user_row:
        raise HTTPException(status_code=404, detail="User not found")

    # Check if product already in cart
    cursor.execute(
        "SELECT * FROM cart WHERE user_id = %s AND product_id = %s",
        (user_row["id"], product_id)
    )
    item = cursor.fetchone()

    if item:
        cursor.execute(
            "UPDATE cart SET quantity = quantity + %s WHERE id = %s",
            (quantity, item["id"])
        )
    else:
        cursor.execute(
            "INSERT INTO cart (user_id, product_id, quantity) VALUES (%s, %s, %s)",
            (user_row["id"], product_id, quantity)
        )

    conn.commit()
    cursor.close()
    conn.close()

    return {"message": "Product added to cart"}

# Update cart item
@app.put("/cart/update")
def update_cart(
    product_id: int,
    quantity: int,
    user: dict = Depends(get_current_user)

):
    username = user["username"]
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute(
        "SELECT id FROM users WHERE username = %s",
        (username, )
    )
    user_row = cursor.fetchone()

    cursor.execute(
        "UPDATE cart SET quantity = %s WHERE user_id = %s AND product_id = %s",
        (quantity, user_row["id"], product_id)
    )

    conn.commit()
    cursor.close()
    conn.close()

    return {"message": "Cart updated"}
# Remove cart item

@app.delete("/cart/remove")
def remove_from_cart(
    product_id: int,
    user: str = Depends(get_current_user)
):
    username = user["username"]
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM cart WHERE user_id = (SELECT id FROM users WHERE username = %s) AND product_id = %s",
        (username, product_id)
    )

    conn.commit()
    cursor.close()
    conn.close()

    return {"message": "Product removed from cart"}
# View cart

@app.get("/cart")
def view_cart(user: dict = Depends(get_current_user)):
    username = user["username"]
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT p.id, p.name, p.price, c.quantity
        FROM cart c
        JOIN products p ON c.product_id = p.id
        WHERE c.user_id = (SELECT id FROM users WHERE username = %s)
    """, (username, ))

    cart_items = cursor.fetchall()

    cursor.close()
    conn.close()

    return cart_items


