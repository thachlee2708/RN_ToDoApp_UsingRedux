import React from 'react';
import {connect} from 'react-redux';
import {changeDataList} from '../../store/actions';

import ItemContainer from './Item';

const mapStateToProps = state => ({
  list: state.list.list,
});
const mapDispatchToProps = dispatch => ({
  changeDataList: payload => dispatch(changeDataList(payload)),
});
const Item = props => {
  return <ItemContainer {...props} />;
};
export default connect(mapStateToProps, mapDispatchToProps)(Item);
