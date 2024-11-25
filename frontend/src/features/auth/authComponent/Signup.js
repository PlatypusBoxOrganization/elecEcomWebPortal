import { Navigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser, createUserAsync } from "../authSlice";
import SUI from "../../../Assets/side-image.png";
const Signup = () => {
     const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  // Define reusable styles
  const inputStyles =
    "block pl-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6";
  const labelStyles = "block text-sm font-medium leading-6 text-gray-600";

  // Form fields configuration
  const formFields = [
    {
      id: "name",
      label: "Full Name",
      type: "text",
      validation: {
        required: "Name is Required",
      },
    },
    {
      id: "email",
      label: "Email Address",
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
    {
      id: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      validation: {
        required: "Confirm Password is required",
      },
    },
  ];
    return (
      <>
        {user && <Navigate to={"/"} replace={true}></Navigate>}
        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center justify-center px-4 py-8">
          {/* Image Section */}
        {/* <div className="flex justify-center">
            <img
              src={SUI}
              alt="Shopping illustration"
              className="w-full max-w-lg h-auto object-contain" // Ensures image is responsive
            />
          </div>
        <div className="flex min-h-full flex-1 flex-col mt-10 mx-60 border-solid border-l-2 border-r-2 border-sky-600 rounded-lg justify-center px-6 py-8 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-sky-600">
              Create Your Account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              className="space-y-6"
              noValidate
              onSubmit={handleSubmit((data) =>
                dispatch(
                  createUserAsync({
                    email: data.email,
                    password: data.password,
                    addresses: [],
                    role: "user",
                    name: data.name,
                  })
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

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-sky-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                >
                  SignUp
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-sky-600">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="font-semibold leading-6 text-sky-600 hover:text-sky-700"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
        </div> */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center justify-center px-4 py-8">
          {/* Image Section */}
          <div className="flex justify-center">
            <img
              src={SUI}
              alt="Shopping illustration"
              className="w-full max-w-lg h-auto object-contain" // Ensures image is responsive
            />
          </div>

          {/* Form Section */}
          <div className="flex min-h-full flex-col rounded-lg justify-center px-6 py-8 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className=" text-2xl font-semibold leading-9 tracking-tight text-black">
                Create an Account
              </h2>
            </div>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="  leading-9 tracking-tight text-black">
               Enter Your Deatails Below
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form
                className="space-y-6"
                noValidate
                onSubmit={handleSubmit((data) =>
                  dispatch(
                    createUserAsync({
                      email: data.email,
                      password: data.password,
                      addresses: [],
                      role: "user",
                      name: data.name,
                    })
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
                        <p className="text-red-500">
                          {errors[field.id].message}
                        </p>
                      )}
                    </div>
                  </div>
                ))}

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                  >
                    SignUp
                  </button>
                </div>
              </form>

              <p className="mt-10 text-center text-sm text-red-600">
                Already have an account?{" "}
                <Link
                  to={"/login"}
                  className="font-semibold leading-6 text-red-600 hover:text-red-700"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </>
    );
}
 
export default Signup;