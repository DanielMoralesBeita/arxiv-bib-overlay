import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { pageElementMain, pageElementSidebar } from './arxiv_page'
import { cookies } from './cookies'
import { state, Status } from './model/State'
//import registerServiceWorker from './registerServiceWorker'
import { BibMain } from './ui/BibMain'
import { Sidebar } from './ui/Sidebar'

function initialize() {
    const active = cookies.active
    state.state = active ? Status.INIT : Status.DISABLED
    state.seen = cookies.seen

    ReactDOM.render(<BibMain state={state}/>, pageElementMain())
    ReactDOM.render(<Sidebar state={state}/>, pageElementSidebar())

    state.bibmodel.configureAvailableFromAbstract()
    if (active) {
        state.bibmodel.loadFromAbtract()

        // FIXME -- a bunch of testing pages (to be removed)
        //state.bibmodel.loadSource('1603.04467', 'cs')
        //state.bibmodel.loadSource('hep-th/9711200', 'hep-th')
        //state.bibmodel.configureSources(arxivid, categories)
        //state.bibmodel.configureSources('1703.00001', [['cs', 'cs.ML']])
        //state.bibmodel.configureSources('1603.04891', [['cs', 'cs.ML']])
        //state.bibmodel.configureSources('1711.04170', [['cs', 'cs.ML']])
    } else {
        // FIXME -- we want to record potential API hits when disabled as well for
        // the the testing period. this should be removed after the testing period
        state.bibmodel.record_api()
    }

    // @ts-ignore -- for debugging purposes
    document.bibex_present = true

    // @ts-ignore -- for debugging purposes
    document.bibex_state = state
}

// @ts-ignore -- for debugging purposes
if (document.bibex_present) {
   console.log('Bibex already present on page')
} else {
    initialize()
}
