import { useState, useEffect } from 'react';
import ComboBox from '../components';
import EstadoInclinacaoCabeca from '../enums/EnumEstadoInclinacaoCabeca';
import EstadoPulso from '../enums/EnumEstadoPulso';
import EstadoCotovelo from '../enums/EnumEstatadoCotovelo';
import LadoBraco from '../enums/EnumLadoBraco';
import Api from '../infra/api';
import './index.css';
import EstadoRotacaoCabeca from '../enums/EnumEstadoRotacaoCabeca ';

const Robo = () => {
    const [mostrarLoading, setMostrarLoading] = useState(true);
    const [Cabeca, setCabeca] = useState({ Inclinacao: '', Rotacao: '' });
    const [BracoEsquerdo, setBracoEsquerdo] = useState({ Cotovelo: '', Pulso: '' });
    const [BracoDireito, setBracoDireito] = useState({ Cotovelo: '', Pulso: '' });

    const handleChange = async (value: string, enumValue: any, origin: string) => {
        await Api.put(`api/${origin}`, value)
            .then(response => {
                alert(`Movimento ${enumValue} realizado com sucesso!`);
            })
            .catch(error => {
                alert(`Erro ao realizar movimento: ${error}`);
            });
    };

    useEffect(() => {
        Api.get('api/Cabeca').then(response => { setCabeca({ Inclinacao: response.data.estadoInclinacao, Rotacao: response.data.estadoRotacao })});
    }, []);

    setInterval(() => {
        setMostrarLoading(false);
    }, 7000);

    return (
        <div className='Robo'>
            {mostrarLoading && <img src={'/src/assets/loading.gif'} className='LoadingGif' onEnded={close} />}
            {!mostrarLoading && <div className='gridPaineis'>
                <div className='PainelTopo'>
                    <img src={'/src/assets/painel.gif'} className='PainelCabecaGif' />
                    <div className='Cabeca'>
                        <h1 className='cabecalho'>Cabeça</h1>
                        <ComboBox text='Inclinação:' enum={EstadoInclinacaoCabeca} onChange={handleChange} origin="Cabeca/Inclinacao" valorInicial={Cabeca.Inclinacao} />
                        <ComboBox text='Rotação:' enum={EstadoRotacaoCabeca} onChange={handleChange} origin="Cabeca/Rotacao" valorInicial={Cabeca.Rotacao} />
                    </div>
                </div>
                <div className='PainelBaixo'>
                    <img src={'/src/assets/painel.gif'} className='PainelBracoEsquerdoGif' />
                    <div className='BracoEsquerdo'>
                        <h1 className='cabecalho'>Braco Esquerdo</h1>
                        <ComboBox text='Cotovelo:' enum={EstadoCotovelo} onChange={handleChange} origin={`Braco/${LadoBraco.Esquerdo}/Cotovelo`} valorInicial={BracoEsquerdo.Cotovelo} />
                        <ComboBox text='Pulso:' enum={EstadoPulso} onChange={handleChange} origin={`Braco/${LadoBraco.Esquerdo}/Pulso`} valorInicial={BracoEsquerdo.Pulso} />
                    </div>
                    <div className='VisorRobo'>
                        <img src={'/src/assets/robo.gif'} className='VisorRoboGif' />
                    </div>
                    <img src={'/src/assets/painel.gif'} className='PainelBracoDireitoGif' />
                    <div className='BracoDireito'>
                        <h1 className='cabecalho'>Braco Direito</h1>
                        <ComboBox text='Cotovelo:' enum={EstadoCotovelo} onChange={handleChange} origin={`Braco/${LadoBraco.Direito}/Cotovelo`} valorInicial={BracoDireito.Cotovelo} />
                        <ComboBox text='Pulso:' enum={EstadoPulso} onChange={handleChange} origin={`Braco/${LadoBraco.Direito}/Pulso`} valorInicial={BracoDireito.Pulso} />
                    </div>
                </div>
            </div>}
        </div>
    );
};

export default Robo;