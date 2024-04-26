import { useRef, useState } from "react";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface IWheelSpinnerProps {
    size: number,
    options: {label: string, value: number}[],
    onSpinDone: (prizeValue: number) => void
}

const WheelSpinner = (props: IWheelSpinnerProps) => {
    
    const [rotateDegrees, setRotateDegrees] = useState(0);
    const [totalDegrees, setTotalDegrees] = useState(0);
    const [isSpinning, setIsSpinning] = useState(false);

    const wheelSpinnerRef = useRef(null);
    const { size, options, onSpinDone } = props;

    const radius = size/2;
    const triangeHeight = +(radius *  (Math.cos((36/2) * (Math.PI / 180)))).toFixed(2);
    const triangleBase = +((radius *  (Math.sin((36/2) * (Math.PI / 180)))) * 2).toFixed(2);

    if(options.length < 10) {
        while(options.length < 10) {
            options.push({label: "", value: 0});
        }
    }

    const onSpin = () => {
        const degrees = (Math.floor(Math.random() * 19) + 10) * 36;
        setRotateDegrees(degrees);
        setTotalDegrees(totalDegrees + degrees)
        setIsSpinning(true);
    }

    useGSAP(() => {
        if(rotateDegrees > 0){
            gsap.to(wheelSpinnerRef.current, {rotation: `+=${rotateDegrees}`, duration: 3, onComplete: () => {
                setIsSpinning(false);
                console.log(rotateDegrees);
                console.log(((totalDegrees % 360)/36) + 1);
                const winner = (totalDegrees % 360)/36;
                console.log(options[winner].value);
                onSpinDone(options[winner].value)
            }})
        }
    }, [rotateDegrees])

    const WheelSection = ({deg, color, text} : {deg: number, color: string, text: string}) => {
        // https://play.tailwindcss.com/MqV6mk2mPm (made by me)
        return (
                <div 
                    style={{height: triangeHeight, width: triangleBase, transform: `rotate(${deg}deg)`, zIndex: 0}} 
                    className={`[clip-path:polygon(100%_0%,0%_0%,50%_100%)] ${color} origin-[50%_100%] absolute flex justify-center items-center`}
                >   
                    <div className="rotate-90 h-8 font-sm font-semibold flex justify-center items-center">
                        <p className="text-white">{text}</p>
                    </div>
                    
                </div>
            )
    }
    return (
        <>
            <div className="w-8 h-8 [clip-path:polygon(100%_0%,0%_0%,50%_100%)] bg-black z-20 absolute align-middle"></div>
            <div style={{height: size, width: size}} className="spinner-container rounded-full" ref={wheelSpinnerRef}>
                <div style={{height: size, width: size}} className="absolute bg-transparent z-10 border-[12px] rounded-full" />
                <div style={{marginLeft: radius - (triangleBase/2), marginTop: radius - triangeHeight}}>
                    {
                        options.map((option, index) => 
                            <WheelSection 
                                deg={-1 * index * 36} 
                                color={index % 2 ? 'bg-blue-300' : 'bg-blue-600'}
                                text={option.label}
                            />
                        )
                    }
                </div>
            </div>
            <div className="mt-5 flex justify-center">
                <button 
                    className="border rounded-md px-3 bg-gray-100 hover:bg-gray-200 text-blue-500 font-semibold p-1 z-30 absolute"
                    onClick={onSpin}
                    disabled={isSpinning}
                >
                    Spin
                </button>
            </div>
        </>
    )
}

export default WheelSpinner