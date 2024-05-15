Chương trình được chạy sử dụng môi trường Parcel 2

## Các bước cài đặt môi trường
Bước 1: Cài đặt Parcel 2
```sh
npm install parcel -g
```
Bước 2: Cài đặt thư viện three.js
```sh
npm install three
```
Bước 3: Cài đặt thư viện dat.gui
```sh
npm install dat.gui
```
## Chạy chương trình
```sh
parcel ./src/index.html
```
## Cách sử dụng chương trình
Tác dụng của các thanh công cụ:
### Thanh công cụ bên trái (Điều khiển camera)
- **Camera Rotation**: 
    - **True**: Camera xoay tự động xung quanh mặt phẳng
    - **False**: Camera dừng lại, người dùng tự xoay camera thủ công bằng cách kéo thả.
- **Camera Rotation Speed**: Điều chỉnh tốc độ xoay của camera

### Thanh công cụ bên phải (Điều khiển Box)
- **Box Color**: Điều chỉnh màu sắc của box
- **Box Segments**: Điều chỉnh số lượng Segment của box
- **Box Scale**: Kích thước của box
- **Box Rotation**: Quyết định box có xoay tự động không
    - **True**: Box xoay tự động xung quanh tâm của chính nó
    - **False**: Box đứng yên
- **Wireframe**: 
    - **True**: Box sẽ được hiển thị dưới dạng khung dây (wireframe)
    - **False**: Box sẽ được hiển thị với các mặt màu đặc
- **x,y,z**: Tọa độ vector (x,y,z) mà box sẽ tịnh tiến theo
- **r**: Bán kính để box xoay quanh trục y
- **Reset Position**: Reset tọa độ của box về tọa độ gốc
