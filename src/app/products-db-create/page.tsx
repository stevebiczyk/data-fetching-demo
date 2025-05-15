import { Submit } from "@/components/submit";
import { addProduct } from "@/prisma-db";
import { redirect } from "next/navigation";

export default function AddProductPage() {
  async function createProduct(formData: FormData) {
    "use server";

    const title = formData.get("title") as string;
    const price = formData.get("price") as string;
    const description = formData.get("description") as string;

    await addProduct(title, parseInt(price), description);
    redirect("/products-db");

    // // Basic validation
    // const errors: Record<string, string> = {};
    // if (!title) errors.title = "Title is required";
    // if (!price || isNaN(Number(price)))
    //   errors.price = "Valid price is required";
    // if (!description) errors.description = "Description is required";

    // if (Object.keys(errors).length > 0) {
    //   return { errors };
    // }

    // // Simulate a database save operation
    // console.log("Product created:", { title, price, description });

    // return { success: true };
  }

  const state = {
    errors: {
      title: "",
      price: "",
      description: "",
    },
  };

  return (
    <form action={createProduct} className="p-4 space-y-4 max-w-96">
      <div>
        <label className="text-black">
          Title
          <input
            type="text"
            className="block w-full p-2 text-black border rounded"
            name="title"
          />
        </label>
        {state.errors.title && (
          <p className="text-red-500">{state.errors.title}</p>
        )}
      </div>
      <div>
        <label className="text-black">
          Price
          <input
            type="number"
            className="block w-full p-2 text-black border rounded"
            name="price"
          />
        </label>
        {state.errors.price && (
          <p className="text-red-500">{state.errors.price}</p>
        )}
      </div>
      <div>
        <label className="text-black">
          Description
          <textarea
            className="block w-full p-2 text-black border rounded"
            name="description"
          />
        </label>
        {state.errors.description && (
          <p className="text-red-500">{state.errors.description}</p>
        )}
      </div>
      {/* <button
        type="submit"
        className="block w-full p-2 text-white bg-blue-500 rounded disabled:bg-gray-500"
      >
        Add product
      </button> */}
      <Submit />
    </form>
  );
}
