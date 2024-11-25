import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAsync, selectError, selectLoggedInUser } from "../authSlice";
const Login = () => {
    const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const user = useSelector(selectLoggedInUser);
 console.log("API error:", JSON.stringify(error, null, 2));  
  // Define reusable styles
  const inputStyles =
    "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6";
  const labelStyles = "block text-sm font-medium leading-6 text-gray-900";

  // Form fields configuration
  const formFields = [
    {
      id: "email",
      label: "Email address",
      type: "email",
      validation: {
        required: "Email is required",
      
      },
    },
    {
      id: "password",
      label: "Password",
      type: "password",
      validation: {
        required: "Password is required",
      },
    },
  ];

    return (
      <>
        {user && <Navigate to="/" replace={true}></Navigate>}

        <div className="flex min-h-full flex-1 mt-10 mx-60 border-solid border-l-2 border-r-2 border-sky-600 rounded-lg flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-sky-600">
              LogIn to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              className="space-y-6"
              noValidate
              onSubmit={handleSubmit((data) =>
                dispatch(
                  loginUserAsync({ email: data.email, password: data.password })
                )
              )}
            >
              {formFields.map((field) => (
                <div key={field.id}>
                  <label htmlFor={field.id} className={labelStyles}>
                    {field.label}
                  </label>
                  <div className="mt-2">
                    <input
                      id={field.id}
                      {...register(field.id, field.validation)}
                      type={field.type}
                      className={inputStyles}
                    />
                    {errors[field.id]?.message && (
                      <p className="text-red-500">{errors[field.id].message}</p>
                    )}
                  </div>
                </div>
              ))}

              {error && (
                <p className="text-red-500">{error.message || error.error}</p>
              )}

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-sky-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                >
                  LogIn
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-sky-600">
              Don't have an account?{" "}
              <Link
                to={"/signup"}
                className="font-semibold leading-6 text-sky-600 hover:text-sky-600"
              >
                SignUp
              </Link>
            </p>
          </div>
        </div>
      </>
    );
}
 
export default Login;
