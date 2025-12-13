<script lang="ts">
	import { setWebsiteColor } from '$lib/stores.svelte';

	setWebsiteColor('json');
</script>

<svelte:head>
	<title>Privacy Policy - Guifier</title>
	<meta name="description" content="Privacy Policy for Guifier. Learn how we collect, use, and protect your data when using our services." />
	<link rel="canonical" href="https://guifier.com/privacy">
</svelte:head>

<div class="flex justify-center px-4 py-12">
	<div class="w-full max-w-2xl prose prose-md">
		<h1>Privacy Policy</h1>
		
		<p><strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

		<p>
			At Guifier, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website guifier.com (the "Service"). Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the Service.
		</p>

		<h2>1. Information We Collect</h2>
		
		<h3>1.1 Information You Provide</h3>
		<p>
			When you use Guifier, you may provide us with certain information:
		</p>
		<ul>
			<li><strong>Data You Input:</strong> Any JSON, YAML, TOML, or XML data you enter into our online editor is processed entirely in your browser. We do not store, transmit, or have access to this data.</li>
			<li><strong>Contact Information:</strong> If you contact us through our website or GitHub, we may collect your name, email address, and any other information you choose to provide.</li>
		</ul>

		<h3>1.2 Automatically Collected Information</h3>
		<p>
			When you visit our website, we automatically collect certain information:
		</p>
		<ul>
			<li><strong>Usage Data:</strong> We use Google Analytics to collect information about how you interact with our website, including pages visited, time spent on pages, and referring websites.</li>
			<li><strong>Device Information:</strong> We may collect information about your device, including browser type, operating system, and device identifiers.</li>
			<li><strong>Cookies:</strong> We use cookies and similar tracking technologies to track activity on our Service and hold certain information.</li>
		</ul>

		<h2>2. How We Use Your Information</h2>
		<p>
			We use the information we collect for various purposes:
		</p>
		<ul>
			<li>To provide, maintain, and improve our Service</li>
			<li>To analyze usage patterns and understand how our Service is used</li>
			<li>To respond to your inquiries and provide customer support</li>
			<li>To detect, prevent, and address technical issues</li>
			<li>To comply with legal obligations</li>
		</ul>

		<h2>3. Data Processing and Storage</h2>
		<p>
			<strong>Important:</strong> All data processing for the Guifier editor happens entirely in your browser using client-side JavaScript. We do not:
		</p>
		<ul>
			<li>Store your data on our servers</li>
			<li>Transmit your data over the network</li>
			<li>Have access to the data you input into the editor</li>
			<li>Share your data with third parties</li>
		</ul>
		<p>
			Your data remains private and secure on your device. Once you close your browser or navigate away from the page, the data is cleared from memory.
		</p>

		<h2>4. Third-Party Services</h2>
		
		<h3>4.1 Google Analytics</h3>
		<p>
			We use Google Analytics to understand how visitors use our website. Google Analytics collects information such as how often users visit our site, what pages they visit, and what other sites they used prior to coming to our site. We use the information we get from Google Analytics to improve our Service.
		</p>
		<p>
			Google Analytics uses cookies to collect this information. You can opt out of Google Analytics by installing the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener">Google Analytics Opt-out Browser Add-on</a>.
		</p>

		<h3>4.2 Google AdSense</h3>
		<p>
			We may display advertisements through Google AdSense. Google AdSense uses cookies to serve ads based on your prior visits to our website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to our site and/or other sites on the Internet.
		</p>
		<p>
			You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener">Google's Ads Settings</a>.
		</p>

		<h2>5. Cookies and Tracking Technologies</h2>
		<p>
			We use cookies and similar tracking technologies to track activity on our Service and store certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
		</p>

		<h2>6. Data Security</h2>
		<p>
			We implement appropriate technical and organizational security measures to protect your information. However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee its absolute security.
		</p>

		<h2>7. Your Rights</h2>
		<p>
			Depending on your location, you may have certain rights regarding your personal information:
		</p>
		<ul>
			<li><strong>Access:</strong> You have the right to request access to your personal information</li>
			<li><strong>Correction:</strong> You have the right to request correction of inaccurate personal information</li>
			<li><strong>Deletion:</strong> You have the right to request deletion of your personal information</li>
			<li><strong>Opt-Out:</strong> You can opt out of certain data collection practices, such as analytics and advertising cookies</li>
		</ul>
		<p>
			To exercise these rights, please contact us using the information provided in the Contact section below.
		</p>

		<h2>8. Children's Privacy</h2>
		<p>
			Our Service is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us so we can delete such information.
		</p>

		<h2>9. Changes to This Privacy Policy</h2>
		<p>
			We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
		</p>

		<h2>10. Contact Us</h2>
		<p>
			If you have any questions about this Privacy Policy, please contact us:
		</p>
		<ul>
			<li>GitHub: <a href="https://github.com/maliknajjar/guifier" target="_blank" rel="noopener">https://github.com/maliknajjar/guifier</a></li>
			<li>Website: <a href="/contact">Contact Page</a></li>
		</ul>

		<h2>11. Compliance</h2>
		<p>
			This Privacy Policy is designed to comply with:
		</p>
		<ul>
			<li>General Data Protection Regulation (GDPR) for users in the European Union</li>
			<li>California Consumer Privacy Act (CCPA) for users in California</li>
			<li>Other applicable data protection laws</li>
		</ul>
	</div>
</div>

