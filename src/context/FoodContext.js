import { createContext, useContext, useReducer } from "react";

export const foodContext = createContext();
export const cartdispatch = createContext();
const reducer = (state, action) => {
    switch (action.type) {
        case 'Add':
            return [...state, { id: action.id, name: action.name, price: action.price, qty: action.qty, size: action.size, img: action.img }];
        case 'Remove':
            let newArr = [...state];
            newArr.splice(action.index, 1);
            return newArr;
        case 'Update':
            let updatearr = [...state];
            updatearr.find((food, index) => {
                if (food.id === action.id) {
                    updatearr[index] = { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price };
                    console.log(food.qty, parseInt(action.qty), action.price + food.price);
                }

            })
            return updatearr;
        case 'Drop':
            let removearr = [];
            return removearr;
        default:
            console.log('error in reducer');
    }
};
export const FoodProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);
    return (
        <cartdispatch.Provider value={dispatch}>
            <foodContext.Provider value={state}>
                {children}
            </foodContext.Provider>
        </cartdispatch.Provider>
    )
}
export const useCart = () => useContext(foodContext);
export const useDispatcher = () => useContext(cartdispatch);

