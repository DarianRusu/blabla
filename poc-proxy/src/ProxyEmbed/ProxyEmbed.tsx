import { useSurlfySession } from "./useSurlfySession";
import { CircularProgress } from "@mui/material";

type ProxyEmbedProps = {
    targetUrl: string;
}

export const ProxyEmbed: React.FC<ProxyEmbedProps> = ({ targetUrl }) => {
    const { state, surflyLink } = useSurlfySession(targetUrl);

    if (state === 'loading') {
        return <CircularProgress />;
    }

    if (state === "error") {
        return <div>UPS!</div>
    }

    return <iframe height={768} width={1366} title="surfly-proxy" src={surflyLink} />
}