import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Accordion, Col, Row, Container } from 'react-bootstrap';
import method from '../../../../hooks/web3/sendTransaction';
import contract from '../../../../hooks/axios/contract';
import { getLocalData } from '../../../../config/localStrage';
import '../../Client.css';

const Stage0 = ({ adList }) => {
  const applicant = adList.Advertisement_has_Suppliers;
  const adId = adList.id
  const accessToken = getLocalData('accessToken');
  const isClient = getLocalData('isClient');

    // 1. Multi-Sig Wallet Deploy
    const handleDeploy = async (supplierId) => {
      try {
        if (isClient === "false") return alert("광고주 계정으로만 이용가능합니다.");
        if (accessToken && isClient && supplierId && adId) {
          const supplierAddr = "0xebF43eF8B387652A862DaFE5990f264336C58DB5"; //더미
          const tx = await method.multiSigWalletDeploy(supplierAddr);
          const contractAddress = tx._address;
          if (contractAddress) {
            const result = await contract.conference(accessToken, isClient, supplierId, adId, contractAddress)
            if (result) {
              alert("contract deploy is success!");
              window.location.reload();
            }
          } else return alert("다시 로그인 해주세요");
        }
      } catch (err) {
        console.log(err);
        alert("contract deploy is fail!");
      }
    };

  //명단
  const ApplicantList = ({ idx, el }) => {
    const applicant = el.Supplier;
    if(applicant){
      return (
        <>
          <div>
            <div>{idx+1}번째 지원자</div>
            <span>채널명{applicant.channelName}</span>
            <span>: </span>
            <span>{applicant.channelUrl}</span>
          </div>
          <img src={applicant.profileImgUrl} alt="채널이미지" />
          <div>
            <div>구독자수{applicant.subscriberCount}</div> 
            <div>조회수{applicant.viewCount}</div>
          </div>
          <button onClick={() => handleDeploy(applicant.id)}>{applicant.channelName}을 선택</button>
        </>
      );
    }
  }

  return (
    <>
      {applicant && applicant.map((el, idx)=><ApplicantList key={idx} idx={idx} el={el} />)}
    </>
  );
}

export default Stage0;