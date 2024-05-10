import { useState } from 'react';
import './index.css'
import ComboBox from '../components';
import EstadoInclinacaoCabeca from '../enums/EnumEstadoInclinacaoCabeca';
import EstadoRotacaoCabeca from '../enums/EnumEstadoRotacaoCabeca ';

const Robo = () => {
    const [mostrarLoading, setMostrarLoading] = useState(true);

    setInterval(() => {
        setMostrarLoading(false);
    }, 7000);

    return (
        <div className='Robo'>
            {mostrarLoading && <img src={'/src/assets/loading.gif'} className='LoadingGif' onEnded={close} />}
            <div className='gridPaineis'>
                <div className='PainelTopo'>
                    {!mostrarLoading && <img src={'/src/assets/painel.gif'} className='PainelCabecaGif' />}
                    <div className='PainelCabeca'>
                        <div className='InclinacaoCabeca'>
                            <div className='LabelPainel'>Inclinação:</div>
                            <ComboBox enum={EstadoInclinacaoCabeca} />
                        </div>
                        <div className='RotacaoCabeca'>
                            <div className='LabelPainel'>Rotação:</div>
                            <ComboBox enum={EstadoRotacaoCabeca} />
                        </div>
                    </div>
                </div>
                <div className='PainelBaixo'>
                    <div className='PainelBracoEsquerdo'>
                        {!mostrarLoading && <img src={'/src/assets/painel.gif'} className='PainelBracoEsquerdoGif' />}
                    </div>
                    <div className='VisorRobo'>
                        {!mostrarLoading && <img src={'/src/assets/robo.gif'} className='VisorRoboGif' />}
                    </div>
                    <div className='PainelBracoDireito'>
                        {!mostrarLoading && <img src={'/src/assets/painel.gif'} className='PainelBracoDireitoGif' />}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Robo