        export const AddElement = async (newElement,api) => {
          console.log(api)
            await fetch(`${api}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newElement),
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