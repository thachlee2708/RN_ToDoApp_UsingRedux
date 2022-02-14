import React from 'react';
import {connect} from 'react-redux';
import HomeContainer from './HomeContainer';
import {changeDataList, updateDataList} from '../../store/actions';

const mapStateToProps = state => ({
  list: state.list.list,
});
const mapDispatchToProps = dispatch => ({
  updateDataList: payload => dispatch(updateDataList(payload)),
  changeDataList: payload => dispatch(changeDataList(payload)),
});
const Home = props => {
  return <HomeContainer {...props} />;
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
