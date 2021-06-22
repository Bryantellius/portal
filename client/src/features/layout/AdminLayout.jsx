import React  from 'react';
import { Container } from 'react-bootstrap';
import AdminSidebar from '../admin/AdminSidebar';
import './AdminLayout.scss';
import { useSelector } from 'react-redux';
import { getIsLoading } from '../core/app.slice';
import Loading from '../shared/components/Loading';

const AdminLayout = ({
  children
}) => {
  const isLoading = useSelector(getIsLoading);
  return (
    <main className="docs">
      {/* Nav */}
      <AdminSidebar />
      <div className="content-with-sidebar">
        <Container fluid className="px-0">
          <ContentLoader isLoading={isLoading}>
            { children }
          </ContentLoader>
        </Container>
      </div>
    </main>
  );
};

const ContentLoader = ({ isLoading, children }) => {
  return isLoading
    ? <Loading />
    : <>{ children }</>
}

export default AdminLayout;
