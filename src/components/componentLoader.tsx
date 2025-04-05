const ComponentLoader = ({show, useWhiteBg, size}:any) => show ? 
<div className={`relative top-0 bottom-0 w-full flex justify-center items-center z-[999] 

${useWhiteBg ? 'bg-white' : ''}`}>
    <div className={`rounded-full ${size ? size : 'w-[20px] h-[20px] border-[4px]'} border-primary/10   border-t-primary component-loader`} />
</div> : null

export default ComponentLoader;