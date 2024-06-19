import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import './css/scannerQR.css';
const ScannerQR = () => {
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 250,
                height: 250
            },
            fps: 5,
        });

        const success = (decodedText) => {
            scanner.clear().then(() => {
                console.log('QR Code scanner cleared.');
            }).catch(error => {
                console.error('Failed to clear QR Code scanner.', error);
            });
            try {
                const parsedResult = JSON.parse(decodedText);
                if (parsedResult.patientId?.name || parsedResult.chronicDiseases?.length || parsedResult.allergy?.length || parsedResult.surgery?.length) {
                    setResult(parsedResult);
                    setError(null);
                } else {
                    setError('This QR code is invalid. It is missing some required information.');
                    setResult(null);
                }
            } catch (e) {
                setError('This QR code is invalid. It could not be parsed.');
                setResult(null);
            }
        };

        const handleError = (err) => {
            console.warn(err);
        };

        scanner.render(success, handleError);

        return () => {
            scanner.clear().catch(error => {
                console.error('Failed to clear QR Code scanner on component unmount.', error);
            });
        };
    }, []);

    return (
        <div className='scanner-container'>
            {error ? (
                <div className='error'>
                    <h1>{error}</h1>
                </div>
            ) : result ? (
                <div className='result'>
                        <div class="center">
                            <div class="article-card">
                                <div class="content">
                                    <p class="date">Patient Name: {result.patientId?.name}</p>
                                    <p class="title">Chronic Diseases:
                                        <ul>
                                            {result.chronicDiseases?.map((disease, index) => (
                                                <li key={index}>{disease}</li>
                                            ))}
                                        </ul>
                                    </p>
                                    <p class="title">Allergy:
                                        <ul>
                                            {result.allergy?.map((allergy, index) => (
                                                <li key={index}>{allergy}</li>
                                            ))}
                                        </ul>
                                    </p>
                                    <p class="title">Surgery:
                                        <ul>
                                            {result.surgery?.map((surgery, index) => (
                                                <li key={index}>{surgery}</li>
                                            ))}
                                        </ul>
                                    </p>
                                </div>
                            </div>
                        </div>
                </div>
            ) : (
                <div id='reader'></div>
            )}
        </div>
    );
}

export default ScannerQR;
