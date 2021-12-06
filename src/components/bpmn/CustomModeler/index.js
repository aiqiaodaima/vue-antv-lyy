import Modeler from 'bpmn-js/lib/Modeler'
import inherits from 'inherits'

export default function CustomModeler(options) {
  Modeler.call(this, options)
}

inherits(CustomModeler, Modeler)
