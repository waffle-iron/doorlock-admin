import React, { PropTypes } from 'react'
import { Row, Col } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import { scanIdCard } from '../../actions/studentIdCardActions';
import { editMember, loadMemberEditPage } from '../../actions/entitiesActions';
import MemberForm from '../../components/member.form/MemberForm.jsx';
import { getUser, getUserExists } from '../../reducers/selectors';

class EditMemberPageStateless extends React.Component {
  componentDidMount() {
    const { loadMemberEditPage, memberId } = this.props;
    loadMemberEditPage(memberId);
  }
  getInitialValues(member) {
    if(!member) return {}
    const { id, balance, createdAt, updatedAt, ...initValues } = member;
    return initValues;
  }
  render() {
    const {
      waitingForCardScan,
      scanIdCard,
      editMember,
      member,
      memberId,
      memberDontExist
    } = this.props;

    if(memberDontExist) {
      return (
        <h5 style={{textAlign:'center'}}>{`Medlem med id ${memberId} finnes ikke`}</h5>
      )
    }
    return (
      <Row>
        <div className='col-md-6' style={{margin:'auto', float:'none'}}>
          <MemberForm
            form='editMember'
            enableReinitialize={true}
            initialValues={this.getInitialValues(member)}
            title='Endre medlem'
            submitBtnTxt='Endre medlem'
            scanCard={{
              isLoading: waitingForCardScan,
              click: scanIdCard
            }}
            onSubmit={(values) => editMember(memberId,values)}  />
        </div>
      </Row>
    )
  }
}


const EditMemberPage = connect(
  (state, ownProps) => {
    const memberId = ownProps.params.id;
    return {
      waitingForCardScan: state.studentIdCard.isLoading,
      memberDontExist: getUserExists(state, memberId),
      member: getUser(state, memberId),
      memberId,
    }
  },
  {
    scanIdCard: scanIdCard.bind(null,'editMember'),
    editMember: editMember.bind(null, 'editMember'),
    loadMemberEditPage
  }
)(EditMemberPageStateless)

export default EditMemberPage;
