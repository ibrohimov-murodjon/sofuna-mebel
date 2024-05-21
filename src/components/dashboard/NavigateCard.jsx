import { Link } from "react-router-dom";
import { EmployeeBack, EmployeeBlack, MessageBack, MessageBlack, OrderBack, OrderBlack, WarehouseBack, WarehouseBlack } from "../../assets";

const MenuItems = [
  {
    id: 2,
    name: "Warehouse",
    unActive: WarehouseBlack,
    link: "/product",
    back:WarehouseBack
  },
  {
    id: 3,
    name: "Order",
    unActive: OrderBlack,
    link: "/order",
    back: OrderBack
  },
  {
    id: 4,
    name: "Message",
    unActive: MessageBlack,
    link: "/message",
    back: MessageBack
  },
  {
    id: 5,
    name: "Employee",
    unActive: EmployeeBlack,
    link: "/xodimlar",
    back:EmployeeBack
  },
];
function NavigateCard() {
    return(
        <div className="flex items-center gap-x-3 pb-8">
            {MenuItems.map(menu => {
                return(
                    <Link style={{backgroundImage: `url(${menu.back})`, backgroundPosition:'center', backgroundSize: 'cover', backgroundRepeat:'no-repeat',}}  className={` border w-full h-32 flex items-center justify-center rounded-sm flex-col border-red-200`} to={menu.link}>
                    <img src={menu.unActive} className="w-8 h-8" />
                    <p className="text-[30px] text-yellow-700 font-semibold">{menu.name}</p>
                    </Link>
                )
            })}
        </div>
    )
}

export default NavigateCard;
