import DataTable from '../../shared/dataTable/DataTable';
import { columnDefinitions } from '../../module/module.config';

const CourseModules = ({
  onCreate,
  onRemove,
  onEdit,
  modules
}) => {
  const rowActions = [{
    name: 'Edit',
    onClick: (row, index) => {
      onEdit.call(onEdit, index);
    }
  }];

  const actions = [{
    name: 'Add',
    onClick: onCreate
  }];

  return (
      <DataTable
        title="Included Modules"
        columns={columnDefinitions}
        data={modules.filter(module => module.id || module?.isSaved)}
        rowActions={rowActions}
        actions={actions}
        selectableRows>
      </DataTable>
  );
};

export default CourseModules;