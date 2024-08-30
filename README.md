TECH STACK:
    Front end: HTML, CSS, JS
    Back end: Django
    Database:
    MySQL: Sử dụng MySQL để lưu trữ thông tin khách hàng, đơn hàng, menu, giao dịch, và chi phí.
    Realtime Communication:
    WebSockets (Flask-SocketIO hoặc Django Channels): Để thông báo đơn hàng cho thu ngân và nhà bếp theo thời gian thực, bạn có thể tích hợp WebSockets.
    Deployment: Heroku
    Nginx + Gunicorn/Uvicorn:
    Lưu trữ và Quản lý giao dịch: Redis

Quy trình phát triển:
### 1. **Thiết kế giao diện (Frontend)**
- **Bước 1**: Tạo các trang HTML cơ bản: Trang chủ, menu, trang đặt món, trang quản lý đơn hàng cho nhà bếp, trang cho thu ngân.
  - **Bước 2**: Sử dụng CSS để định dạng các trang: tạo layout, màu sắc, kiểu chữ.
  - **Bước 3**: Thêm JavaScript để xử lý các hành động từ người dùng như thêm món vào giỏ hàng, gửi đơn hàng, xác nhận đơn.

### 2. **Thiết lập môi trường Django (Backend)**
- **Bước 4**: Cài đặt Django và khởi tạo một dự án Django:
  ```bash
  django-admin startproject restaurant_app
  cd restaurant_app
  ```
  - **Bước 5**: Tạo các ứng dụng con trong Django (apps) cho từng phần của hệ thống:
      - **Menu**: Quản lý danh sách món ăn.
      - **Order**: Quản lý đơn hàng từ khách.
      - **Transaction**: Quản lý giao dịch và thanh toán.
    ```bash
    python manage.py startapp menu
    python manage.py startapp order
    python manage.py startapp transaction
    ```

### 3. **Kết nối MySQL Database**
- **Bước 6**: Cài đặt MySQL và cấu hình Django để kết nối với MySQL trong file `settings.py`:
  ```python
  DATABASES = {
      'default': {
          'ENGINE': 'django.db.backends.mysql',
          'NAME': 'restaurant_db',
          'USER': 'your_user',
          'PASSWORD': 'your_password',
          'HOST': 'localhost',
          'PORT': '3306',
      }
  }
  ```
  - **Bước 7**: Tạo các model cho `Menu`, `Order`, `Transaction`, và chạy lệnh migrate để tạo bảng trong MySQL:
    ```bash
    python manage.py makemigrations
    python manage.py migrate
    ```

### 4. **Xây dựng hệ thống WebSockets với Django Channels**
- **Bước 8**: Cài đặt **Django Channels** để hỗ trợ WebSockets:
  ```bash
  pip install channels
  ```
  - **Bước 9**: Cấu hình `ASGI` server trong `settings.py` và khởi tạo cấu hình Django Channels:
    ```python
    ASGI_APPLICATION = "restaurant_app.asgi.application"
    ```
  - **Bước 10**: Tạo các consumer trong Django Channels để xử lý việc thông báo đơn hàng cho nhà bếp và thu ngân theo thời gian thực.

### 5. **Lưu trữ phiên và quản lý giao dịch với Redis**
- **Bước 11**: Cài đặt **Redis** và tích hợp vào Django để lưu trữ session và quản lý hàng đợi:
  ```bash
  pip install django-redis
  ```
  - **Bước 12**: Cấu hình Redis trong `settings.py`:
    ```python
    CACHES = {
        "default": {
            "BACKEND": "django_redis.cache.RedisCache",
            "LOCATION": "redis://127.0.0.1:6379/1",
            "OPTIONS": {
                "CLIENT_CLASS": "django_redis.client.DefaultClient",
            }
        }
    }
    ```

### 6. **Triển khai ứng dụng lên Heroku**
- **Bước 13**: Cài đặt Heroku CLI và khởi tạo ứng dụng trên Heroku:
  ```bash
  heroku create
  ```
  - **Bước 14**: Thêm các file `Procfile`, `requirements.txt`, và `runtime.txt` cần thiết cho Heroku.
  - **Bước 15**: Triển khai ứng dụng lên Heroku:
    ```bash
    git push heroku main
    ```

### 7. **Cấu hình Nginx và Gunicorn/Uvicorn**
- **Bước 16**: Cấu hình Gunicorn làm WSGI server trong Heroku. Thêm Gunicorn vào `Procfile`:
  ```bash
  web: gunicorn restaurant_app.wsgi --log-file -
  ```
  - **Bước 17**: Triển khai Nginx như một reverse proxy (trên server khác nếu không sử dụng Heroku).

### 8. **Tính toán chi phí và doanh thu**
- **Bước 18**: Sử dụng Django ORM để truy vấn dữ liệu từ database và tạo các báo cáo doanh thu, chi phí.
  - **Bước 19**: Dùng Pandas hoặc Excel export để phân tích và tính toán doanh thu định kỳ.

### 9. **Kiểm thử và bảo trì**
- **Bước 20**: Kiểm thử chức năng của hệ thống, đảm bảo hệ thống hoạt động ổn định từ khâu đặt món đến thanh toán và thông báo theo thời gian thực.
  - **Bước 21**: Bảo trì định kỳ để đảm bảo tính ổn định và bảo mật cho hệ thống.

Cấu trúc thu mục của dự án:
    restaurant_app/
    │
    ├── restaurant_app/                # Thư mục chính của dự án Django
    │   ├── __init__.py
    │   ├── asgi.py
    │   ├── settings.py                # Cấu hình dự án
    │   ├── urls.py                    # Định tuyến các URL
    │   ├── wsgi.py
    │   └── templates/                 # Thư mục chứa các template HTML
    │       ├── base.html              # Template HTML cơ bản
    │       └── ... (các template khác)
    │   └── static/                    # Thư mục chứa các file tĩnh
    │       ├── css/                   # Thư mục chứa file CSS
    │       │   └── styles.css
    │       ├── js/                    # Thư mục chứa file JavaScript
    │       │   └── scripts.js
    │       └── images/                # Thư mục chứa hình ảnh tĩnh
    │
    ├── menu/                          # Ứng dụng con cho quản lý menu
    │   ├── migrations/
    │   ├── models.py                  # Định nghĩa các model cho món ăn
    │   ├── views.py                   # Xử lý logic hiển thị menu
    │   ├── urls.py                    # Định tuyến các URL cho menu
    │   └── admin.py                   # Cấu hình cho Django Admin quản lý menu
    │
    ├── order/                         # Ứng dụng con cho quản lý đơn hàng
    │   ├── migrations/
    │   ├── models.py                  # Định nghĩa các model cho đơn hàng
    │   ├── views.py                   # Xử lý logic cho việc đặt hàng
    │   ├── urls.py                    # Định tuyến các URL cho đặt hàng
    │   └── consumers.py               # WebSockets consumers xử lý đơn hàng theo thời gian thực
    │
    ├── transaction/                   # Ứng dụng con cho quản lý giao dịch và thanh toán
    │   ├── migrations/
    │   ├── models.py                  # Định nghĩa các model cho giao dịch
    │   ├── views.py                   # Xử lý logic cho thanh toán
    │   ├── urls.py                    # Định tuyến các URL cho giao dịch
    │
    ├── redis/                         # Thư mục cho cấu hình Redis và hàng đợi
    │   └── redis_config.py            # Cấu hình kết nối Redis
    │
    ├── manage.py                      # File quản lý các lệnh Django
    ├── requirements.txt               # Liệt kê các package cần cài đặt
    ├── Procfile                       # File cần thiết cho Heroku để khởi động ứng dụng
    ├── runtime.txt                    # Xác định phiên bản Python cần dùng trên Heroku
    ├── Dockerfile                     # File Docker để tạo image (nếu cần)
    └── README.md                      # Mô tả dự án
