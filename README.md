# 🚀 BlackThar Frontend - React + Vite

**BlackThar Frontend** es una aplicación creada con **React** y **Vite**, diseñada para conectarse con el backend de **BlackThar** basado en **Spring Boot**. Incluye autenticación con **JWT**, enrutamiento con **React Router**, manejo de estado con **Context API**, y una estructura modular para escalabilidad.

---

## 📌 Tecnologías Usadas
- **React 18**
- **Vite**
- **React Router**
- **Context API**
- **Tailwind CSS**
- **Axios**
- **ESLint & Prettier**

---

## 🚀 Configuración del Proyecto

### 1️⃣ Clonar el Repositorio
```sh
git clone https://github.com/tu-usuario/blackthar-front.git
cd blackthar-front
```

### 2️⃣ Instalar Dependencias
```sh
npm install
```
### 3️⃣ Configurar Variables de Entorno
Crea un archivo .env en la raíz del proyecto:

```sh
VITE_API_URL=http://localhost:8080
VITE_AUTH_SECRET=mi_clave_secreta
```
🔹 Explicación:

VITE_API_URL → URL del backend en Spring Boot.
VITE_AUTH_SECRET → Clave secreta para manejar tokens (si es necesario).
### 4️⃣ Ejecutar el Proyecto
```sh
npm run dev
```
La aplicación estará disponible en:
🔗 http://localhost:5173

🛠️ Estructura del Proyecto
```pgsql
blackthar-front/
│── src/
│   ├── app/
│   │   ├── feed/
│   │   ├── login/
│   │   ├── register/
│   ├── components/
│   │   ├── PrivateRoute.jsx
│   │   ├── ThemeToggle.jsx
│   ├── contexts/
│   │   ├── AuthContext.jsx
│   │   ├── ThemeContext.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   ├── styles/
│   │   ├── globals.css
│   ├── App.jsx
│   ├── main.jsx
│── .env
│── .gitignore
│── index.html
│── package.json
│── vite.config.js
│── README.md
```

## 🔑 Autenticación con JWT
El frontend maneja la autenticación con Context API y LocalStorage.

### 1️⃣ Login (Autenticación)
```js
const login = async (username, password) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) throw new Error("Credenciales incorrectas");

    const data = await response.json();
    localStorage.setItem("token", data.token);
    return data;
  } catch (error) {
    console.error("Error de login:", error);
  }

};
```
###2️⃣ Proteger Rutas con PrivateRoute.jsx
```jsx
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/login" />;
};
```
export default PrivateRoute;
🔹 Uso en App.jsx:

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route element={<PrivateRoute />}>
    <Route path="/dashboard" element={<Dashboard />} />
  </Route>
</Routes>
```

## Licencias
### Hecho: Haider Jerez Vergel
### Github: https://github.com/haiderjerez
