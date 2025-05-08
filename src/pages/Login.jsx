import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Login() {
  // use the useAuth hook to manage the authentication functionality
  const { formErrors, register, onSubmit, loading, isAuthenticated } =
    useAuth();

  const navigate = useNavigate(); // use the useNavigate hook to navigate to the home page

  // navigate to the home page when the user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Sesión iniciada");
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <div className="size-full flex flex-col justify-center items-center">
      <article className="max-w-[300px] w-full flex flex-col gap-y-3 p-3 border border-gray-300 rounded-md shadow">
        <h1 className="text-3xl text-center text-black">Login</h1>
        <form
          className="flex flex-col gap-4 w-full max-w-md"
          onSubmit={onSubmit}
        >
          <input
            type="text"
            placeholder="Nombre de usuario"
            className={`w-full rounded-md border focus:border-2 p-2 ${
              formErrors["username"]
                ? "outline-none focus:border-red-400 border-red-600"
                : "border-gray-500"
            }`}
            {...register("username", {
              required: "Se requiere el nombre de usuario",
              maxLength: {
                value: 50,
                message:
                  "El nombre de usuario no debe exceder los 50 caracteres",
              },
            })}
            maxLength={50}
          />
          <input
            type="password"
            placeholder="Contraseña"
            className={`w-full rounded-md border focus:border-2 p-2 ${
              formErrors["password"]
                ? "outline-none focus:border-red-400 border-red-600"
                : "border-gray-500"
            }`}
            {...register("password", {
              required: "Se requiere la contraseña",
              maxLength: {
                value: 25,
                message: "La contraseña no debe exceder los 25 caracteres",
              },
              minLength: {
                value: 8,
                message: "La contraseña debe tener al menos 8 caracteres",
              },
            })}
            maxLength={25}
            minLength={8}
          />
          <button
            className="w-full rounded-md bg-blue-400 border text-white p-2 hover:bg-blue-500 text-xl transition duration-400 ease-in-out"
            type="submit"
            disabled={loading}
          >
            {loading ? "Iniciando sesión..." : "Login"}
          </button>
        </form>
      </article>
    </div>
  );
}

export default Login;
