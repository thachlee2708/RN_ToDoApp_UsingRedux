import React from 'react';
import {connect} from 'react-redux';
import {changeDataList, updateDataList} from '../../store/actions';

import InputContainer from './InputContainer';

const mapStateToProps = state => ({
  list: state.list.list,
});
const mapDispatchToProps = dispatch => ({
  changeDataList: payload => dispatch(changeDataList(payload)),
  updateDataList: payload => dispatch(updateDataList(payload)),
});
const Input = props => {
  return <InputContainer {...props} />;
};
export default connect(mapStateToProps, mapDispatchToProps)(Input);
