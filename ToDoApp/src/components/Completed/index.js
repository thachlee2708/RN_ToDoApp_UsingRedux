import React from 'react';
import {connect} from 'react-redux';
import {changeDataList} from '../../store/actions';
import {updateDataList} from '../../store/actions';
import CompletedContainer from './CompletedContainer';

const mapStateToProps = state => ({
  list: state.list.list,
});
const mapDispatchToProps = dispatch => ({
  changeDataList: payload => dispatch(changeDataList(payload)),
  updateDataList: payload => dispatch(updateDataList(payload)),
});
const Completed = props => {
  return <CompletedContainer {...props} />;
};
export default connect(mapStateToProps, mapDispatchToProps)(Completed);
