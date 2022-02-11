import {DATALIST_CHANGE} from '../actions/actionTypes';
import {DATALIST_UPDATE} from '../actions/actionTypes';
const initialState = {
  list: [
    {
      detail: '1',
      key: '1',
      name: '1',
      status: 'Doing',
      time: '11:16 AM 1/25/2022',
    },
    {
      detail: '',
      key: '2',
      name: '2',
      status: 'Doing',
      time: '2:24:PM 2/10/2022',
    },
    {
      detail: '',
      key: '16',
      name: '6',
      status: 'Completed',
      time: '2:24:PM 2/10/2022',
    },
    {
      detail: '',
      key: '32',
      name: '7',
      status: 'Doing',
      time: '2:23:PM 2/10/2022',
    },
    {
      detail: '',
      key: '108',
      name: '9',
      status: 'Completed',
      time: '2:24:PM 2/10/2022',
    },
    {
      detail: '',
      key: '160',
      name: '12',
      status: 'Doing',
      time: '2:23:PM 2/10/2022',
    },
  ],
};
export default listReducer = (state = initialState, action) => {
  switch (action.type) {
    case DATALIST_CHANGE:
      return {
        ...state,
        list: action.payload,
      };
    case DATALIST_UPDATE:
      return {
        ...state,
        list: [...state.list],
      };
    default:
      return state;
  }
};
