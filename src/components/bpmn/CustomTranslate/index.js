import translations from './translations'

export default function customTranslate(template, replacements) {
  replacements = replacements || {}
  template = translations[template] || template
  return template.replace(/{([^}]+)}/g, function(_, key) {
    return replacements[key] || '{' + key + '}'
  })
}