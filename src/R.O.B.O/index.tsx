import { useState, useEffect } from 'react';
import ComboBox from '../components';
import EstadoInclinacaoCabeca from '../types/EnumEstadoInclinacaoCabeca';
import EstadoPulso from '../types/EnumEstadoPulso';
import EstadoCotovelo from '../types/EnumEstatadoCotovelo';
import Api from '../infra/api';
import './index.css';
import EstadoRotacaoCabeca from '../types/EnumEstadoRotacaoCabeca ';

const Robo = () => {
    const [mostrarLoading, setMostrarLoading] = useState(true);
    const [Cabeca, setCabeca] = useState({ Inclinacao: '', Rotacao: '' });
    const [BracoEsquerdo, setBracoEsquerdo] = useState({ Cotovelo: '', Pulso: '' });
    const [BracoDireito, setBracoDireito] = useState({ Cotovelo: '', Pulso: '' });

    const handleChange = async (value: string, enumValue: any, origin: string) => {
        await Api.put(`api/${origin}`, value)
            .then(response => {
                alert(`Movimento realizado com sucesso!`);
            })
            .catch(error => {
                alert(`Sistema Corrompido!`);
                window.location.reload();
            });
    };

    useEffect(() => {
        Api.get('api/Cabeca').then(response => { setCabeca({ Inclinacao: response.data.estadoInclinacao, Rotacao: response.data.estadoRotacao }) });
        Api.get('api/Braco/Esquerdo').then(response => { setBracoEsquerdo({ Cotovelo: response.data.estadoCotovelo, Pulso: response.data.estadoPulso }) });
        Api.get('api/Braco/Direito').then(response => { setBracoDireito({ Cotovelo: response.data.estadoCotovelo, Pulso: response.data.estadoPulso }) });
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
                        <ComboBox text='Cotovelo:' enum={EstadoCotovelo} onChange={handleChange} origin={`Braco/0/Cotovelo`} valorInicial={BracoEsquerdo.Cotovelo} />
                        <ComboBox text='Pulso:' enum={EstadoPulso} onChange={handleChange} origin={`Braco/0/Pulso`} valorInicial={BracoEsquerdo.Pulso} />
                    </div>
                    <div className='VisorRobo'>
                        <img src={'/src/assets/robo.gif'} className='VisorRoboGif' />
                    </div>
                    <img src={'/src/assets/painel.gif'} className='PainelBracoDireitoGif' />
                    <div className='BracoDireito'>
                        <h1 className='cabecalho'>Braco Direito</h1>
                        <ComboBox text='Cotovelo:' enum={EstadoCotovelo} onChange={handleChange} origin={`Braco/1/Cotovelo`} valorInicial={BracoDireito.Cotovelo} />
                        <ComboBox text='Pulso:' enum={EstadoPulso} onChange={handleChange} origin={`Braco/1/Pulso`} valorInicial={BracoDireito.Pulso} />
                    </div>
                </div>
            </div>}
        </div>
    );
};

export default Robo;