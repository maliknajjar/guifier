<script lang="ts">
	import { setWebsiteColor } from '$lib/stores.svelte';

	setWebsiteColor('json');
</script>

<svelte:head>
	<title>Terms of Service - Guifier</title>
	<meta name="description" content="Terms of Service for Guifier. Read our terms and conditions for using our services." />
	<link rel="canonical" href="https://guifier.com/terms">
</svelte:head>

<div class="flex justify-center px-4 py-12">
	<div class="w-full max-w-2xl prose prose-md">
		<h1>Terms of Service</h1>
		
		<p><strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

		<p>
			Welcome to Guifier. These Terms of Service ("Terms") govern your access to and use of the Guifier website located at guifier.com (the "Service") operated by Guifier ("we," "us," or "our"). By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of these terms, then you may not access the Service.
		</p>

		<h2>1. Acceptance of Terms</h2>
		<p>
			By accessing and using this Service, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this Service.
		</p>

		<h2>2. Description of Service</h2>
		<p>
			Guifier is an interactive front-end toolkit that allows users to visualize, edit, and manipulate structured data formats including JSON, YAML, TOML, and XML. The Service is provided both as a web application and as an open-source library available via npm and CDN.
		</p>

		<h2>3. Use License</h2>
		<p>
			Guifier is released under the MIT License. This means:
		</p>
		<ul>
			<li>You are free to use, modify, and distribute the software</li>
			<li>You can use it for commercial purposes</li>
			<li>You can use it in private projects</li>
			<li>The software is provided "as is" without warranty</li>
		</ul>
		<p>
			The full license text is available at <a href="https://github.com/maliknajjar/guifier/blob/main/LICENSE" target="_blank" rel="noopener">https://github.com/maliknajjar/guifier/blob/main/LICENSE</a>.
		</p>

		<h2>4. User Responsibilities</h2>
		<p>
			When using Guifier, you agree to:
		</p>
		<ul>
			<li>Use the Service only for lawful purposes</li>
			<li>Not use the Service to process or store sensitive personal information in a way that violates applicable privacy laws</li>
			<li>Not attempt to gain unauthorized access to any part of the Service</li>
			<li>Not use the Service in any way that could damage, disable, or impair the Service</li>
			<li>Not use automated systems to access the Service without permission</li>
		</ul>

		<h2>5. Data and Privacy</h2>
		<p>
			All data processing in the Guifier web editor occurs entirely in your browser. We do not:
		</p>
		<ul>
			<li>Store your data on our servers</li>
			<li>Transmit your data over the network</li>
			<li>Have access to the data you input</li>
		</ul>
		<p>
			However, you are responsible for:
		</p>
		<ul>
			<li>Ensuring you have the right to process any data you input</li>
			<li>Complying with applicable data protection laws</li>
			<li>Not inputting data that violates any laws or regulations</li>
		</ul>
		<p>
			For more information about how we handle data, please see our <a href="/privacy">Privacy Policy</a>.
		</p>

		<h2>6. Intellectual Property</h2>
		<p>
			The Service and its original content, features, and functionality are owned by Guifier and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
		</p>
		<p>
			The Guifier library code is open source and available under the MIT License. You may use, modify, and distribute the library code in accordance with the MIT License terms.
		</p>

		<h2>7. Disclaimer of Warranties</h2>
		<p>
			THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. GUIFIER AND ITS SUPPLIERS AND LICENSORS HEREBY DISCLAIM ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF MERCHANTABILITY, NON-INFRINGEMENT, AND FITNESS FOR PARTICULAR PURPOSE.
		</p>
		<p>
			We do not warrant that:
		</p>
		<ul>
			<li>The Service will be available at all times or uninterrupted</li>
			<li>The Service will be error-free or secure</li>
			<li>Any defects or errors will be corrected</li>
			<li>The Service is free of viruses or other harmful components</li>
		</ul>

		<h2>8. Limitation of Liability</h2>
		<p>
			IN NO EVENT SHALL GUIFIER, NOR ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES, BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR USE OF THE SERVICE.
		</p>
		<p>
			Some jurisdictions do not allow the exclusion of certain warranties or the exclusion or limitation of liability for consequential or incidental damages, so the limitations above may not apply to you.
		</p>

		<h2>9. Indemnification</h2>
		<p>
			You agree to defend, indemnify, and hold harmless Guifier and its licensee and licensors, and their employees, contractors, agents, officers and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees), resulting from or arising out of:
		</p>
		<ul>
			<li>Your use and access of the Service</li>
			<li>Your violation of any term of these Terms</li>
			<li>Your violation of any third party right, including without limitation any copyright, property, or privacy right</li>
		</ul>

		<h2>10. Termination</h2>
		<p>
			We may terminate or suspend your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will cease immediately.
		</p>

		<h2>11. Changes to Terms</h2>
		<p>
			We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
		</p>
		<p>
			By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Service.
		</p>

		<h2>12. Governing Law</h2>
		<p>
			These Terms shall be interpreted and governed by the laws of the jurisdiction in which Guifier operates, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
		</p>

		<h2>13. Severability</h2>
		<p>
			If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and supersede and replace any prior agreements we might have between us regarding the Service.
		</p>

		<h2>14. Contact Information</h2>
		<p>
			If you have any questions about these Terms of Service, please contact us:
		</p>
		<ul>
			<li>GitHub: <a href="https://github.com/maliknajjar/guifier" target="_blank" rel="noopener">https://github.com/maliknajjar/guifier</a></li>
			<li>Website: <a href="/contact">Contact Page</a></li>
		</ul>

		<h2>15. Acknowledgment</h2>
		<p>
			By using the Service, you acknowledge that you have read these Terms of Service and agree to be bound by them.
		</p>
	</div>
</div>

