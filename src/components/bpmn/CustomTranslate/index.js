import translations from './translations'

export default function customTranslate(template, replacements) {
  replacements = replacements || {}
  template = template.replace(/{([^}]+)}/g, function(_, key) {
    return replacements[key] || '{' + key + '}'
  })
  return translations[template] || template
}