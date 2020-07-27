import config from '../config.json'
var rootURL = config.rootURL

export const getJsonLD = (page) => {
	let urls = page.url.replace(page.rootURL).split('/')
	let pagesName = ['blog', 'buy', 'youtube', 'workshop', 'project', 'internship', 'ad']
	let jsonLD = []
	if (urls.length == 1 || urls.length > 1 && !pagesName.includes(urls[1])) {
		jsonLD.push(`
		{
			"@context": "https://schema.org",
			"@type": "Organization",
			"name": "Topic",
			"url": "${page.rootURL}/",
			"logo": "${page.rootURL}/logo512.jpg",
			"contactPoint": {
				"@type": "ContactPoint",
				"telephone": "+91-8961677327",
				"email": "admin@topic.com",
				"contactType": "Customer Service"
			},
			"sameAs": [
				"https://www.facebook.com/topic",
				"https://instagram.com/topic",
				"https://www.linkedin.com/company/topic",
				"https://www.youtube.com/channel/topic",
				"https://twitter.com/topic"
			]
		}`)
	}

	jsonLD.push(`{
		"@context": "http://schema.org",
		"@type": "WebSite",
		"name": "Topic",
		"url": "${page.rootURL}/",
		"sameAs": [
			"https://www.facebook.com/topic",
			"https://instagram.com/topic",
			"https://www.linkedin.com/company/topic",
			"https://www.youtube.com/channel/topic",
			"https://twitter.com/topic"
		],
		"potentialAction": {
			"@type": "SearchAction",
			"target": "${page.rootURL}/${urls.length > 1 && pagesName.includes(urls[1]) ? urls[1] : `project`}?search={search_term}",
			"query-input": "required name=search_term"
		}
	}`)

	if (urls.length > 2) {
		jsonLD.push(`{
			"@context": "http://schema.org",
			"@type": "BreadcrumbList",
			"itemListElement": [
			{
				"@type": "ListItem",
				"position": 1,
				"name": "${urls[1].replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase())}",
				"item": {
				"@type": "WebPage",
				"@id": "${rootURL}/${urls[1]}"
				}
			}
			]
		}`)
	}

	return `[${jsonLD.join()}]`
}