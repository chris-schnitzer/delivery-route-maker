import { useForm, useFieldArray } from "react-hook-form";
import { v4 as uuid } from "uuid";
import "../Forms.css";

export default function AddForm({ passFormData }) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      vanNo: "",
      items: [{ value: "" }],
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const onSubmit = (data) => {
    const formWithIds = {
      ...data,
      vanId: uuid(),
      items: data.items.map((item) => ({
        itemId: uuid(),
        value: item.value,
      })),
    };
    passFormData(formWithIds);
    reset({ vanNo: "", items: [{ value: "" }] });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p>Select multiple items and proceed to your list.</p>
      
        <small className="text-danger">{errors?.vanNo?.message}</small>
        <br />
        <input
          type="text"
          placeholder="Van No."
          {...register("vanNo", { required: "Please enter the van no" })}
          className="van-no-input"
        />

      <br />

      {fields.map((field, index) => (
        <div className="item-validation-input" key={field.id}>
          <small className="text-danger">{errors?.items?.[index]?.value?.message}</small>
          <div className="item-row">
            <input
              type="text"
              placeholder="Item"
              {...register(`items.${index}.value`, {
                required: "Please enter an item",
              })}
              className="item-input"
            />
            {fields.length > 1 && (
              <span 
                className="remove-form-item"
                onClick={(e) => {
                  e.preventDefault();  
                  remove(index)}
                }
              >
                -
              </span>
            )}
            </div>
        </div>
      ))}

      <br />
      <span onClick={() => append({ value: "" })} className="add-new-icon">
        +
      </span>
      <br />
      <button className="add-to-list" type="submit">
        Add items
      </button>
    </form>
  );
}
