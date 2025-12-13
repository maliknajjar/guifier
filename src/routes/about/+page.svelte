<script lang="ts">
	import { setWebsiteColor } from '$lib/stores.svelte';

	setWebsiteColor('json');
</script>

<svelte:head>
	<title>About Guifier - Interactive Data Format Toolkit</title>
	<meta name="description" content="Learn about Guifier, an interactive front-end toolkit for JSON, YAML, TOML, and XML data. Discover how we simplify data visualization and editing for developers." />
	<link rel="canonical" href="https://guifier.com/about">
</svelte:head>

<div class="flex justify-center px-4 py-12">
	<div class="w-full max-w-2xl prose prose-md">
		<h1>About Guifier</h1>
		
		<p>
			Guifier is an innovative, open-source front-end toolkit designed to revolutionize how developers and data professionals interact with structured data formats. Our mission is to make data manipulation intuitive, visual, and accessible to everyone, regardless of their technical expertise.
		</p>

		<h2>Our Story</h2>
		<p>
			Guifier was born from a simple observation: working with JSON, YAML, TOML, and XML data formats shouldn't require memorizing complex syntax or risking errors from manual editing. Traditional text-based editors make it easy to introduce syntax errors, especially when dealing with deeply nested structures or large datasets.
		</p>
		<p>
			We set out to create a solution that transforms raw data into an intuitive graphical interface, allowing users to visualize, edit, and manipulate data with confidence. What started as a personal project has evolved into a comprehensive toolkit trusted by developers worldwide.
		</p>

		<h2>What Makes Guifier Unique</h2>
		<p>
			Unlike traditional text editors or basic form builders, Guifier automatically generates a complete graphical user interface from your data structure. This means:
		</p>
		<ul>
			<li><strong>Zero Configuration:</strong> Simply provide your data, and Guifier creates the interface automatically</li>
			<li><strong>Multi-Format Support:</strong> Work seamlessly with JSON, YAML, TOML, XML, and JavaScript objects</li>
			<li><strong>Real-Time Conversion:</strong> Convert between formats instantly without losing data integrity</li>
			<li><strong>Error Prevention:</strong> Visual editing eliminates syntax errors common in manual text editing</li>
			<li><strong>Developer-Friendly:</strong> Easy integration via npm or CDN, with full TypeScript support</li>
		</ul>

		<h2>Key Features</h2>
		
		<h3>Interactive Data Visualization</h3>
		<p>
			Transform complex nested data structures into clear, hierarchical visual representations. Navigate through objects and arrays effortlessly, with intuitive controls for expanding and collapsing sections.
		</p>

		<h3>Intelligent Type Handling</h3>
		<p>
			Guifier automatically detects and handles different data types appropriately:
		</p>
		<ul>
			<li>Strings with proper text input fields</li>
			<li>Numbers with numeric inputs and validation</li>
			<li>Booleans with toggle switches</li>
			<li>Dates with date pickers</li>
			<li>Arrays with dynamic add/remove functionality</li>
			<li>Objects with nested structure support</li>
		</ul>

		<h3>Format Conversion</h3>
		<p>
			One of Guifier's most powerful features is its ability to convert data between formats seamlessly. Import JSON, edit it visually, and export it as YAML, TOML, or XML—all without manual conversion or data loss.
		</p>

		<h3>Real-Time Editing</h3>
		<p>
			See your changes reflected instantly. Whether you're editing in the GUI or code view, both interfaces stay synchronized, giving you the flexibility to work the way you prefer.
		</p>

		<h2>Use Cases</h2>
		<p>
			Guifier is perfect for a wide range of applications:
		</p>
		<ul>
			<li><strong>API Development:</strong> Test and modify API request/response payloads</li>
			<li><strong>Configuration Management:</strong> Edit config files across different formats</li>
			<li><strong>Data Migration:</strong> Convert data between formats during system migrations</li>
			<li><strong>Educational Tools:</strong> Teach data structures and formats visually</li>
			<li><strong>Content Management:</strong> Allow non-technical users to edit structured data</li>
			<li><strong>Debugging:</strong> Inspect and modify complex data structures during development</li>
		</ul>

		<h2>Technology Stack</h2>
		<p>
			Guifier is built with modern web technologies to ensure performance, reliability, and ease of integration:
		</p>
		<ul>
			<li><strong>Framework:</strong> Built with Svelte for optimal performance and small bundle size</li>
			<li><strong>Type Safety:</strong> Full TypeScript support for better developer experience</li>
			<li><strong>Styling:</strong> Tailwind CSS for responsive, modern UI components</li>
			<li><strong>Parsing:</strong> Robust parsers for JSON, YAML, TOML, and XML formats</li>
		</ul>

		<h2>Open Source Commitment</h2>
		<p>
			Guifier is released under the MIT License, making it free for both personal and commercial use. We believe in the power of open-source software and are committed to maintaining an active, welcoming community. Contributions, feedback, and suggestions are always welcome.
		</p>

		<h2>Our Vision</h2>
		<p>
			We envision a future where working with structured data is as intuitive as using a spreadsheet. Our goal is to continue expanding Guifier's capabilities, supporting more data formats, adding advanced features like validation schemas, and improving the user experience based on community feedback.
		</p>

		<h2>Get Involved</h2>
		<p>
			Whether you're a developer looking to contribute, a user with feature requests, or someone who wants to report a bug, we'd love to hear from you. Visit our <a href="https://github.com/maliknajjar/guifier" target="_blank" rel="noopener">GitHub repository</a> to get started.
		</p>

		<p>
			Thank you for being part of the Guifier community. Together, we're making data manipulation more accessible and enjoyable for everyone.
		</p>
	</div>
</div>

