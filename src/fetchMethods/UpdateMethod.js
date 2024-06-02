export const UpdateElement = async (updateElement,api, id) => {
    console.log(api,updateElement, id)
      await fetch(`${api}${id}/`, {
        method: "PATCH",
            headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateElement),
      })
        .then((res) => {
          if (res.ok) {
            console.log("Amalyot muaffaqiyatli");
          }
        })
        .catch((error) => {
          console.error("Malumot o'chirishda muammo yuz berdi", error);
        });
    }
