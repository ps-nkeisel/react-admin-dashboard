import WhitelistEmails from './WhitelistEmails'
import BlockWords from './BlockWords'
import BlockIPs from './BlockIPs'
import BlockEmails from './BlockEmails'

export default () => (
    <>
        <WhitelistEmails />
        <BlockWords />
        <BlockIPs />
        <BlockEmails />
    </>
)