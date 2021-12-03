import BpmnModeler from './BpmnModeler'
import BpmnViewer from './BpmnViewer'

export default {
  install(Vue){
    Vue.component('BpmnModeler', BpmnModeler)
    Vue.component('BpmnViewer', BpmnViewer)
  }
}

