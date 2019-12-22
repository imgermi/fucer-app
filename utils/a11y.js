export const moverFocoPagina = (pagina) => {
	pagina.$nextTick(() => {
		setTimeout(() => {
			let focusTarget = pagina.$refs.routerView

			// Make focustarget programmatically focussable
			focusTarget.setAttribute('tabindex', '-1')

			// Focus element
			focusTarget.focus()

			// Remove tabindex from focustarget. 
			// Reason: https://axesslab.com/skip-links/#update-3-a-comment-from-gov-uk
			focusTarget.removeAttribute('tabindex')
		}, 0)
	});
}