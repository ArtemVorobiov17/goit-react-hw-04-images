import { Vortex } from "react-loader-spinner";

export function Loader() {
    return (
        <Vortex
            visible={true}
            height="80"
            width="80"
            ariaLabel="vortex-loading"
            wrapperStyle={{
                marginTop: 20,
                marginLeft: 'auto',
                marginRight: 'auto',
            }}
            wrapperClass="vortex-wrapper"
            colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
        />
    );    
}