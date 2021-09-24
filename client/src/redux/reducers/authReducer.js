import { GLOBALTYPES } from '../actions/globalTypes';

const initialState = {
  infoRegis: {
    account: {
      username: '',
      email: '',
      password: '',
      birthday: '',
    },
    plan: {
      price: '',
      type: '',
    },
    card: {
      firstName: '',
      lastName: '',
      cardNumber: '',
      expiredDate: '',
      securityCode: '',
    },
  },
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case GLOBALTYPES.AUTH:
      return action.payload;
    case GLOBALTYPES.STEPBEGIN:
      return {
        ...state,
        infoRegis: {
          ...state.infoRegis,
          account: {
            ...state.infoRegis.account,
            email: action.payload,
          },
        },
      };
    case GLOBALTYPES.STEPONE:
      return {
        ...state,
        infoRegis: {
          ...state.infoRegis,
          account: action.payload,
        },
      };
    case GLOBALTYPES.STEPTWO:
      return {
        ...state,
        infoRegis: {
          ...state.infoRegis,
          plan: action.payload,
        },
      };
    case GLOBALTYPES.STEPTHREE:
      return {
        ...state,
        infoRegis: {
          ...state.infoRegis,
          card: action.payload,
        },
      };
    default:
      return state;
  }
};

export default authReducer;
