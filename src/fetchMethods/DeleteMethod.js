export const deleteElement = async (id,api) => {
    await fetch(`${api}${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
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