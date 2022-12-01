import React from 'react';
import Swal from 'sweetalert2';

import lockPdfImg from '../../../../dummyfiles/document.png';
import revokeImg from '../../../../dummyfiles/cancel.png';
import { handleFileImg, handleViewPdf } from '../../../../hooks/ipfs/getPdfFile';

import { Container, Row, Col, Image } from 'react-bootstrap';

import '../../Supplier.css';
import '../ContractDownload.css';

//파기
const Stage5 = ({ adList, setIsLoading }) => {

  const loadPdf = async (token_uri, title, createdAt) => {
    try {
    setIsLoading(true);
    await handleViewPdf(token_uri, title, createdAt);
    setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      await Swal.fire({
        icon: 'error',
        title: '계약서 발급이 실패하였습니다.',
      });
    }
  };

  return (
    <>
      <Container className='supplierManagement_container'>
        <Row className='supplierStage3_contentArea'>
          <Col className='completeCol'>
            <Image src={revokeImg} className="completeIcon"></Image>
            Revoked
          </Col>
        <hr />
          <Row
            onMouseOver={handleFileImg}
            onMouseOut={handleFileImg}
            onClick={() => loadPdf(adList.token_uri, adList.title, adList.createdAt)}
          >
            <Image src={lockPdfImg} className="contractDownloadIcon"></Image>
            <Col className='contractDownload'>
                계약서 다운로드
            </Col>
          </Row>
        </Row>
      </Container>
    </>
  );
}

export default Stage5;