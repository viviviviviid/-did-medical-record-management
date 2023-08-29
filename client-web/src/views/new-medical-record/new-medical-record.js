import React, { useState, useEffect} from 'react';
import Header from '../../modules/header.js';
import Footer from '../../modules/footer.js';
import axios from "axios";
import {useNavigate} from 'react-router-dom';

export default function NewMedicalRecord() {
    const [hospital, setHospital] = useState("");
    const [doctor, setDoctor] = useState("");
    const [dateOfVisit, setDateOfVisit] = useState("");
    const [historyOfPresentIllness, setHistoryOfPresentIllness] = useState("");
    const [pastMedicalHistory, setPastMedicalHistory] = useState("");
    const [medications, setMedications] = useState("");
    const [allergies, setAllergies] = useState("");
    const [physicalExamination, setPhysicalExamination] = useState("");
    const [laboratoryResults, setLaboratoryResults] = useState("");
    const [radiologicalFindings, setRadiologicalFindings] = useState("");
    const [diagnosis, setDiagnosis] = useState("");
    const [treatment, setTreatment] = useState("");
    const [medicationPrescribed, setMedicationPrescribed] = useState("");
    const [followUp, setFollowUp] = useState("");
    const [additionalComments, setAdditionalComments] = useState("");
    const [name, setName] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        if(new URL(document.location.toString()).searchParams.get("patient"))
            setName(new URL(document.location.toString()).searchParams.get("patient"));
    }, []);

    const handleClick = () => {
        const recordData = {
            hospital: hospital,
            doctor: doctor,
            dateOfVisit: dateOfVisit,
            historyOfPresentIllness: historyOfPresentIllness,
            pastMedicalHistory: pastMedicalHistory,
            medications: medications,
            allergies: allergies,
            physicalExamination: physicalExamination,
            laboratoryResults: laboratoryResults,
            radiologicalFindings: radiologicalFindings,
            diagnosis: diagnosis,
            treatment: treatment,
            medicationPrescribed: medicationPrescribed,
            followUp: followUp,
            additionalComments: additionalComments,
        }

        console.log(recordData)

        // jwt와 did는 유저 회원가입시 또는 진료내용이 업데이트 될 떄마다, 서버에서 프론트로 던져줄예정
        // 이제 그걸 모바일에서 홀드하고 있어야함 // 그래서 현재는 임시로 지정해줄것임

        const vcJwt = "eyJhbGciOiJFUzI1NkstUiIsInR5cCI6IkpXVCJ9.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7Imlzc3VlciI6eyJuYW1lIjoiTWVkaWNhbCBSZWNvcmQgTWFuYWdlbWVudCBBc3NvY2lhdGlvbiIsImFkZHJlc3MiOiIweDNGZTdEQjQ3MDcyMDBlY0RlN2Q0Nzg4YjgwNWYyMjU2RTNiQzQ4NjcifSwidXNlckluZm8iOnsibmFtZSI6IuyEnOuvvOyEnSIsImVtYWlsIjoic2VvLW1pbnNlb2tAZGF1bS5uZXQiLCJiaXJ0aGRheSI6Ijk3MDcyMyIsInBob25lTnVtYmVyIjoiMDEwLTI3MDEtMTYyNyIsImlzRG9jdG9yIjp0cnVlLCJhZGRyZXNzIjoiMHg2ZjY0MkIyODU3MTkzOTkyZTgwMkEyZEE2ZkEwZGJkMDJmQ2Y0OTYwIn0sIm1lZGljYWxSZWNvcmRzIjoiNDQxMzZmYTM1NWIzNjc4YTExNDZhZDE2ZjdlODY0OWU5NGZiNGZjMjFmZTc3ZTgzMTBjMDYwZjYxY2FhZmY4YSIsImRvY3RvckxpY2Vuc2UiOm51bGx9fSwic3ViIjp7ImRpZCI6ImRpZDpldGhyOmdvZXJsaToweDZmNjQyQjI4NTcxOTM5OTJlODAyQTJkQTZmQTBkYmQwMmZDZjQ5NjAiLCJhZGRyZXNzIjoiMHg2ZjY0MkIyODU3MTkzOTkyZTgwMkEyZEE2ZkEwZGJkMDJmQ2Y0OTYwIn0sImlzcyI6ImRpZDpldGhyOmdvZXJsaToweDcxMjkwODdmODE1YkZjN0YzMDI3NTAxMmQ0NjM0QjQxNDBBQzUzOUMifQ.u_QfRD8YRNXD9EfKXSWqqL9KpSWs5FXj6tEiBJJf7ixpzjVSc4Y2cnZcRUi7nmFZfuNZ9kmAWWNWhq6UdI-eoQA"; 
        const SUBJECT_DID = {
            did: 'did:ethr:goerli:0x6f642B2857193992e802A2dA6fA0dbd02fCf4960',
            address: '0x6f642B2857193992e802A2dA6fA0dbd02fCf4960',
            signer: undefined,
            alg: undefined,
            owner: undefined,
            controller: undefined
          };

        axios.post('http://localhost:5001/user/new-record', {recordData, vcJwt, SUBJECT_DID})
            .then(res => {
                console.log(res); 
                // 이게 도착할때까지 "블록체인과 연결중입니다" 로딩창 팝업 띄워놓기 // 블록체인 속도 때문
            })

        navigate(`/patient-medical-records?patient=${name}`)
    }

    return (
        <div className='root'>
            <Header />
            <div className='body column-center'>
                <p style={{ fontSize: '30px' }}>진료기록 작성</p>
                <div className='input-container'>
                    <p className='input-title' style={{ marginBottom: '3vh' }}>기본 정보</p>
    
                    {/* 진료일자 */}
                    <div className='input-field row'>
                        <div className='desc-container-1'>
                            <p className='desc'>진료일자</p>
                        </div>
                        <input className='input-1' value={dateOfVisit} onChange={(e) => setDateOfVisit(e.target.value)} />
                    </div>

                    {/* 환자명 */}
                    <div className='input-field row'>
                        <div className='desc-container-1'>
                            <p className='desc'>환자명</p>
                        </div>
                        <input className='input-1' value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
    
                    {/* 진료 병원 */}
                    <div className='input-field row'>
                        <div className='desc-container-1'>
                            <p className='desc'>진료 병원</p>
                        </div>
                        <input className='input-1' value={hospital} onChange={(e) => setHospital(e.target.value)} />
                    </div>
    
                    {/* 담당 의사명 */}
                    <div className='input-field row'>
                        <div className='desc-container-1'>
                            <p className='desc'>담당 의사명</p>
                        </div>
                        <input className='input-1' value={doctor} onChange={(e) => setDoctor(e.target.value)} />
                    </div>
    
                    {/* 현재 병력사 */}
                    <div className='input-field row'>
                        <div className='desc-container-1'>
                            <p className='desc'>현재 병력사</p>
                        </div>
                        <input className='input-1' value={historyOfPresentIllness} onChange={(e) => setHistoryOfPresentIllness(e.target.value)} />
                    </div>
    
                    {/* 과거 병력사 */}
                    <div className='input-field row'>
                        <div className='desc-container-1'>
                            <p className='desc'>과거 병력사</p>
                        </div>
                        <input className='input-1' value={pastMedicalHistory} onChange={(e) => setPastMedicalHistory(e.target.value)} />
                    </div>
    
                    {/* 약물 처방 내역 */}
                    <div className='input-field row'>
                        <div className='desc-container-1'>
                            <p className='desc'>약물 처방 내역</p>
                        </div>
                        <input className='input-1' value={medications} onChange={(e) => setMedications(e.target.value)} />
                    </div>
    
                    {/* 알레르기 정보 */}
                    <div className='input-field row'>
                        <div className='desc-container-1'>
                            <p className='desc'>알레르기 정보</p>
                        </div>
                        <input className='input-1' value={allergies} onChange={(e) => setAllergies(e.target.value)} />
                    </div>
    
                    {/* 신체검사 결과 */}
                    <div className='input-field row'>
                        <div className='desc-container-1'>
                            <p className='desc'>신체검사 결과</p>
                        </div>
                        <input className='input-1' value={physicalExamination} onChange={(e) => setPhysicalExamination(e.target.value)} />
                    </div>
    
                    {/* 실험실 결과 */}
                    <div className='input-field row'>
                        <div className='desc-container-1'>
                            <p className='desc'>실험실 결과</p>
                        </div>
                        <input className='input-1' value={laboratoryResults} onChange={(e) => setLaboratoryResults(e.target.value)} />
                    </div>
    
                    {/* 방사선 판독 소견 */}
                    <div className='input-field row'>
                        <div className='desc-container-1'>
                            <p className='desc'>방사선 판독 소견</p>
                        </div>
                        <input className='input-1' value={radiologicalFindings} onChange={(e) => setRadiologicalFindings(e.target.value)} />
                    </div>
    
                    {/* 진단 */}
                    <div className='input-field row'>
                        <div className='desc-container-1'>
                            <p className='desc'>진단</p>
                        </div>
                        <input className='input-1' value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} />
                    </div>
    
                    {/* 치료 */}
                    <div className='input-field row'>
                        <div className='desc-container-1'>
                            <p className='desc'>치료</p>
                        </div>
                        <input className='input-1' value={treatment} onChange={(e) => setTreatment(e.target.value)} />
                    </div>
    
                    {/* 처방된 약물 */}
                    <div className='input-field row'>
                        <div className='desc-container-1'>
                            <p className='desc'>처방된 약물</p>
                        </div>
                        <input className='input-1' value={medicationPrescribed} onChange={(e) => setMedicationPrescribed(e.target.value)} />
                    </div>
    
                    {/* 후속 조치 */}
                    <div className='input-field row'>
                        <div className='desc-container-1'>
                            <p className='desc'>후속 조치</p>
                        </div>
                        <input className='input-1' value={followUp} onChange={(e) => setFollowUp(e.target.value)} />
                    </div>
    
                    {/* 추가 코멘트 */}
                    <div className='input-field row'>
                        <div className='desc-container-2'>
                            <p className='desc'>추가 코멘트</p>
                        </div>
                        <textarea className='input-2' value={additionalComments} onChange={(e) => setAdditionalComments(e.target.value)} />
                    </div>

                    <div className='row-center'>
                        <button className='submit-button' 
                                onClick={handleClick} >제출</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}    
                    
