// No componente Robo
import { useState } from 'react';
import ComboBox from '../components';
import EstadoInclinacaoCabeca from '../enums/EnumEstadoInclinacaoCabeca';
import EstadoPulso from '../enums/EnumEstadoPulso';
import EstadoRotacaoCabeca from '../enums/EnumEstadoRotacaoCabeca ';
import EstadoCotovelo from '../enums/EnumEstatadoCotovelo';
import LadoBraco from '../enums/EnumLadoBraco';
import Api from '../infra/api';
import './index.css';

const Robo = () => {
    const [mostrarLoading, setMostrarLoading] = useState(true);

    const handleChange = (value: string, enumValue: any, origin: string) => {
        Api.put(`https://localhost:44323/api/${origin}`, value)
    };

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
                        <ComboBox text='Inclinação:' enum={EstadoInclinacaoCabeca} onChange={handleChange} origin="Cabeca/Inclinacao" />
                        <ComboBox text='Rotação:' enum={EstadoRotacaoCabeca} onChange={handleChange} origin="Cabeca/Rotacao" />
                    </div>
                </div>
                <div className='PainelBaixo'>
                    <img src={'/src/assets/painel.gif'} className='PainelBracoEsquerdoGif' />
                    <div className='BracoEsquerdo'>
                        <h1 className='cabecalho'>Braco Esquerdo</h1>
                        <ComboBox text='Cotovelo:' enum={EstadoCotovelo} onChange={handleChange} origin={`Braco/${LadoBraco.Esquerdo}/Cotovelo`} />
                        <ComboBox text='Pulso:' enum={EstadoPulso} onChange={handleChange} origin={`Braco/${LadoBraco.Esquerdo}/Pulso`} />
                    </div>
                    <div className='VisorRobo'>
                        <img src={'/src/assets/robo.gif'} className='VisorRoboGif' />
                    </div>
                    <img src={'/src/assets/painel.gif'} className='PainelBracoDireitoGif' />
                    <div className='BracoDireito'>
                        <h1 className='cabecalho'>Braco Direito</h1>
                        <ComboBox text='Cotovelo:' enum={EstadoCotovelo} onChange={handleChange} origin={`Braco/${LadoBraco.Direito}/Cotovelo`} />
                        <ComboBox text='Pulso:' enum={EstadoPulso} onChange={handleChange} origin={`Braco/${LadoBraco.Direito}/Pulso`} />
                    </div>
                </div>
            </div>}
        </div>
    );
}

export default Robo;
