// PaginationComponent.tsx
import { useRouter, useSearchParams } from 'next/navigation';
import { Pagination as AntPagination, Row } from 'antd';
import { useEffect, useState } from 'react';

interface PaginationProps {
  totalItems: number;
  limit: number;
}

const PaginationComponent: React.FC<PaginationProps> = ({ totalItems, limit }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / limit); // Calculate total pages

  useEffect(() => {
    const page = searchParams.get('page');
    if (page) {
      setCurrentPage(Number(page));
    }
  }, [searchParams]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(`?page=${page}`);
  };

  return (
    <Row justify="center" style={{ marginTop: '16px' }}>
      <AntPagination
        current={currentPage}
        total={totalItems}
        pageSize={limit}
        showSizeChanger={false}
        onChange={handlePageChange}
      />
    </Row>
  );
};

export default PaginationComponent;
