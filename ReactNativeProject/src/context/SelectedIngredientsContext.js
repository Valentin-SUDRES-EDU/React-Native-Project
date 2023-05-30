import { createContext, useReducer, useContext } from 'react';

export const SelectedIngredientsContext = createContext(null);
export const SelectedIngredientsDispatchContext = createContext(null);

export function SelectedIngredientsProvider({ children }) {
  const [selectedIngredients, dispatch] = useReducer(SelectedIngredientsReducer, []);

  return (
    <SelectedIngredientsContext.Provider value={selectedIngredients}>
      <SelectedIngredientsDispatchContext.Provider value={dispatch}>
        {children}
      </SelectedIngredientsDispatchContext.Provider>
    </SelectedIngredientsContext.Provider>
  );
}

export function useSelectedIngredients() {
  return useContext(SelectedIngredientsContext);
}

export function useSelectedIngredientsDispatch() {
  return useContext(SelectedIngredientsDispatchContext);
}

function SelectedIngredientsReducer(selectedIngredients, action) {
  switch (action.type) {
    case 'added': {
      return [
        ...selectedIngredients,
        {
          item: action.item,
          nutritionData: action.nutritionData,
          meals: action.meals,
        },
      ];
    }
    case 'deleted': {
      return selectedIngredients.filter((selectedItem) => selectedItem.item.id !== action.item.id);
    }
    default: {
      throw new Error('Unknown action: ' + action.type);
    }
  }
}
