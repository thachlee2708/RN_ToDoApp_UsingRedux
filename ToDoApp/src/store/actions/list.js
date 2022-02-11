import {DATALIST_CHANGE} from './actionTypes';
import {DATALIST_UPDATE} from './actionTypes';
export const changeDataList = list => {
  return {
    type: DATALIST_CHANGE,
    payload: list,
  };
};
export const updateDataList = list => {
  return {
    type: DATALIST_UPDATE,
    payload: list,
  };
};
