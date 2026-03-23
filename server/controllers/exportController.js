import asyncHandler from 'express-async-handler';
import Lead from '../models/Lead.js';

export const exportLeadsCsv = asyncHandler(async (req, res) => {
  const leads = await Lead.find({}).sort({ createdAt: -1 });

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=\"leads.csv\"');

  // CSV Header
  res.write('Name,Email,Phone,Company,Source,Status,Priority,Created Date\n');

  leads.forEach((lead) => {
    const row = [
      `"${lead.name || ''}"`,
      `"${lead.email || ''}"`,
      `"${lead.phone || ''}"`,
      `"${lead.company || ''}"`,
      `"${lead.source || ''}"`,
      `"${lead.status || ''}"`,
      `"${lead.priority || ''}"`,
      `"${lead.createdAt.toISOString()}"`
    ].join(',');
    res.write(row + '\n');
  });

  res.end();
});
