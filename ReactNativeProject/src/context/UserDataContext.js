import { createContext, useReducer, useContext } from 'react';

export const UserDataContext = createContext(null);
export const UserDataDispatcherContext = createContext(null);

export function UserDataProvider({ children }) {
  const [userData, dispatch] = useReducer(UserDataReducer, []);

  return (
    <UserDataContext.Provider value={userData}>
      <UserDataDispatcherContext.Provider value={dispatch}>
        {children}
      </UserDataDispatcherContext.Provider>
    </UserDataContext.Provider>
  );
}

export function useUserData() {
  return useContext(UserDataContext);
}

export function useUserDataDispatcherContext() {
  return useContext(UserDataDispatcherContext);
}

function UserDataReducer(userData, action) {
  switch (action.type) {
    case 'added': {
      return [
        ...userData,
        {
          item: action.item,
          nutritionData: action.nutritionData,
        },
      ];
    }
    case 'deleted': {
      return userData.filter((t) => t.item !== action.item);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
