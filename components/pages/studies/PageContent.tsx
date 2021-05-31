import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import useStudiesSvcData from '../../../global/hooks/useStudiesSvcData';
import Button from '../../Button';
import defaultTheme from '../../theme/index';
import AddSubmitterModal from './modals/AddSubmittersModal';
import CreateStudyModal from './modals/CreateStudyModal';
import DeleteSubmitterModal from './modals/DeleteSubmitterModal';
import usingNotification from './usingNotification';
import StudiesTable from './StudiesTable';
import { DeleteRow, Study } from './types';

const EMPTY_DELETE_ROW = { studyId: '', submitter: '' };

type Notification = {
  success: boolean;
  title: string;
  message: string;
};

const PageContent = () => {
  const [showCreateStudyModal, setShowCreateStudyModal] = useState(false);
  const [showAddSubmitterModal, setShowAddSubmitterModal] = useState(false);
  const [submitterToDelete, setSubmitterToDelete] = useState<DeleteRow>({ ...EMPTY_DELETE_ROW });

  const { addNotification, NotificationsDiv } = usingNotification();

  const [tableData, setTableData] = useState<Study[]>([]);
  const { fetchStudies, createStudy, addUser, deleteSubmitter } = useStudiesSvcData();

  const updateTable = () => {
    fetchStudies().then(setTableData);
  };

  useEffect(() => {
    updateTable();
  }, []);

  const closeAllModals = () => {
    setShowCreateStudyModal(false);
    setShowAddSubmitterModal(false);
    setSubmitterToDelete({ ...EMPTY_DELETE_ROW });
  };

  const submitCreateStudy = async (currentFormData: any) => {
    const createResult = await createStudy(currentFormData);
    addNotification({
      success: createResult.success,
      message: createResult.message,
    });
    updateTable();
    closeAllModals();
  };

  const submitAddUser = async (currentFormData: any) => {
    const addResult = await addUser(currentFormData);
    addNotification({
      success: addResult.success,
      message: addResult.message,
    });
    updateTable();
    closeAllModals();
  };

  const submitRemoveSubmitter = async () => {
    const removeResult = await deleteSubmitter(submitterToDelete);
    addNotification({
      success: removeResult.success,
      message: removeResult.message,
    });
    updateTable();
    closeAllModals();
  };

  const tableDeleteButtonFunc = (dr: DeleteRow) => () => {
    setSubmitterToDelete(dr);
  };

  return (
    <div
      css={css`
        display: flex;
        margin: 60px;
        flex-direction: column;
      `}
    >
      <CreateStudyModal
        showModal={showCreateStudyModal}
        onClose={closeAllModals}
        submitData={submitCreateStudy}
      />
      <AddSubmitterModal
        showModal={showAddSubmitterModal}
        onClose={closeAllModals}
        submitData={submitAddUser}
      />
      <DeleteSubmitterModal
        email={submitterToDelete.submitter}
        studyId={submitterToDelete.studyId}
        onClose={closeAllModals}
        onSubmit={submitRemoveSubmitter}
      />
      {NotificationsDiv}
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          width: 100%;
          margin-bottom: 30px;
          padding: 20px 0px;
          border-bottom: solid 1px ${defaultTheme.colors.grey_4};
        `}
      >
        <div
          css={css`
            //   ${defaultTheme.typography.heading}
            font-size: 26px;
            line-height: 1.38;
            color: #28519d;
          `}
        >
          Manage Studies
        </div>
        <div>
          <Button
            css={css`
              margin-right: 20px;
            `}
            onClick={() => setShowCreateStudyModal(true)}
          >
            Create a Study
          </Button>
          <Button onClick={() => setShowAddSubmitterModal(true)}>Add Data Submitters</Button>
        </div>
      </div>
      <StudiesTable tableDeleteButtonFunc={tableDeleteButtonFunc} tableData={tableData} />
    </div>
  );
};

export default PageContent;
